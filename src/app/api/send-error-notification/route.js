// src/app/api/send-error-notification/route.js

import { NextResponse } from 'next/server';

// Função para formatar a data em português
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Template do email HTML para Brevo
function createEmailTemplate(errorData) {
  const { message, digest, stack, userAgent, url, timestamp } = errorData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Erro na Aplicação</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          background: #f5f5f5;
        }
        .container {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .header p {
          margin: 8px 0 0 0;
          opacity: 0.9;
        }
        .content { 
          padding: 30px 20px; 
        }
        .error-box { 
          background: #fff5f5; 
          border-left: 4px solid #dc3545; 
          padding: 20px; 
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        .error-box h3 {
          margin: 0 0 10px 0;
          color: #dc3545;
          font-size: 16px;
        }
        .info-table { 
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: #f8f9fa;
          border-radius: 4px;
          overflow: hidden;
        }
        .info-table tr:nth-child(even) { background: white; }
        .info-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #dee2e6;
        }
        .info-table td:first-child { 
          font-weight: 600; 
          color: #495057; 
          width: 140px;
          background: #e9ecef;
        }
        .stack-trace { 
          background: #1a1a1a; 
          color: #f8f8f2; 
          padding: 20px; 
          border-radius: 6px; 
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; 
          font-size: 12px; 
          overflow-x: auto; 
          white-space: pre-wrap; 
          margin: 20px 0; 
          border: 1px solid #333;
        }
        .footer { 
          background: #6c757d; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          font-size: 13px; 
        }
        .badge {
          display: inline-block;
          padding: 4px 8px;
          background: #6c757d;
          color: white;
          border-radius: 12px;
          font-size: 11px;
          font-family: monospace;
        }
        .severity-high { background: #dc3545; }
        .severity-medium { background: #fd7e14; }
        .severity-low { background: #28a745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 Erro na Aplicação</h1>
          <p>Um erro foi detectado em sua aplicação Next.js</p>
        </div>
        
        <div class="content">
          <div class="error-box">
            <h3>Mensagem do Erro:</h3>
            <p><strong>${message || 'Erro não especificado'}</strong></p>
            <span class="badge severity-high">ALTA PRIORIDADE</span>
          </div>
          
          <table class="info-table">
            <tr>
              <td>Data/Hora</td>
              <td>${formatDate(timestamp)}</td>
            </tr>
            <tr>
              <td>URL</td>
              <td>${url || 'Não informado'}</td>
            </tr>
            ${digest ? `
              <tr>
                <td>ID do Erro</td>
                <td><span class="badge">${digest}</span></td>
              </tr>
            ` : ''}
            <tr>
              <td>Navegador</td>
              <td style="font-size: 11px; font-family: monospace;">${userAgent || 'Não informado'}</td>
            </tr>
            <tr>
              <td>Ambiente</td>
              <td><span class="badge">${process.env.NODE_ENV?.toUpperCase() || 'UNKNOWN'}</span></td>
            </tr>
          </table>
          
          ${stack ? `
            <h3 style="color: #495057; margin: 25px 0 15px 0;">Stack Trace Completo:</h3>
            <div class="stack-trace">${stack}</div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p><strong>Sistema de Notificação de Erros</strong></p>
          <p>Enviado automaticamente via Brevo em ${formatDate(timestamp)}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request) {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    const requiredEnvVars = ['BREVO_API_KEY', 'NOTIFICATION_EMAIL', 'FROM_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Variáveis de ambiente faltando:', missingVars);
      return NextResponse.json(
        { 
          success: false, 
          error: `Configuração incompleta: ${missingVars.join(', ')}` 
        },
        { status: 500 }
      );
    }

    // Extrair dados do erro da requisição
    const errorData = await request.json();
    const { message, digest, stack, userAgent, url, timestamp } = errorData;

    // Preparar payload para API do Brevo
    const emailPayload = {
      sender: {
        name: process.env.FROM_NAME || "Sistema de Erros",
        email: process.env.FROM_EMAIL
      },
      to: [
        {
          email: process.env.NOTIFICATION_EMAIL,
          name: process.env.TO_NAME || "Desenvolvedor"
        }
      ],
      subject: `🚨 ERRO - ${message || 'Erro não especificado'}`,
      htmlContent: createEmailTemplate(errorData),
      // Versão texto como fallback
      textContent: `
ERRO NA APLICAÇÃO

Mensagem: ${message || 'Erro não especificado'}
Data/Hora: ${formatDate(timestamp)}
URL: ${url || 'Não informado'}
${digest ? `ID do Erro: ${digest}` : ''}
Navegador: ${userAgent || 'Não informado'}
Ambiente: ${process.env.NODE_ENV?.toUpperCase() || 'UNKNOWN'}

${stack ? `Stack Trace:\n${stack}` : ''}

---
Sistema de Notificação de Erros
Enviado automaticamente via Brevo em ${formatDate(timestamp)}
      `.trim(),
      // Tags para organização no Brevo
      tags: ['error-notification', 'nextjs', process.env.NODE_ENV || 'unknown'],
      // Headers personalizados
      headers: {
        'X-Mailin-custom': `error_id:${digest || 'unknown'}|timestamp:${timestamp}`
      }
    };

    // Enviar via API do Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Erro da API Brevo: ${responseData.message || response.statusText}`);
    }

    // Log de sucesso
    console.log('Notificação de erro enviada via Brevo:', {
      messageId: responseData.messageId,
      to: process.env.NOTIFICATION_EMAIL,
      subject: emailPayload.subject,
      timestamp: new Date().toISOString(),
      errorId: digest
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Notificação enviada com sucesso via Brevo',
      messageId: responseData.messageId 
    });

  } catch (error) {
    console.error('Erro ao enviar notificação via Brevo:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}