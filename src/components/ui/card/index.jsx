import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Rating,
    CardFooter,
} from "@material-tailwind/react";

export default function TestimonialCard({
    title,
    description,
    avatarSrc,
    authorName,
    authorRole,
    rating = 5,
}) {
    return (
        <Card
            as="figure" // Melhora o SEO tratando o card como uma figura de conteúdo.
            // Classes de responsividade: w-full para ocupar a largura total,
            // flex-col para empilhar o conteúdo verticalmente.
            // Transições e interatividade: Animações suaves ao passar o mouse.
            className="w-full h-full flex flex-col p-6 gap-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer border border-gray-200 rounded-xl bg-white"
            role="group" // Agrupa elementos relacionados para tecnologias assistivas.
        >
            <CardHeader
                color="transparent"
                shadow="false"
                className="p-0"
            >
                <Typography
                    as="h3" // Usando <h3> para melhor hierarquia semântica.
                    type="h5" // 'type' controla o estilo, 'as' controla a tag HTML.
                    color="blue-gray"
                    className="font-bold leading-snug" // Ajustado para melhor legibilidade
                >
                    {title}
                </Typography>
            </CardHeader>

            <CardBody as="blockquote" className="p-0 flex-grow">
                <Typography className="font-normal text-gray-700 text-base leading-relaxed">
                    &quot;{description}&quot;
                </Typography>
            </CardBody>

            <CardFooter as="figcaption" className="p-0 pt-4 flex flex-col justify-end gap-4 mt-auto"> {/* mt-auto para empurrar o rodapé para baixo */}
                <div className="flex items-center gap-4">
                    <Avatar size="lg" alt={authorName} src={avatarSrc} className="border border-gray-100" />
                    <div className="flex flex-col">
                        <Typography type="h6" className="text-gray-900">{authorName}</Typography>
                        <Typography type="small" color="gray" className="text-gray-500">{authorRole}</Typography>
                    </div>
                </div>
                {/* Melhor acessibilidade para o rating usando aria-label */}
                <div aria-label={`Avaliação: ${rating} de 5 estrelas.`}>
                    <Rating value={rating} readonly className="text-amber-500" />
                </div>
            </CardFooter>
        </Card>
    );
}