'use client';

import * as React from 'react';
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Avatar,
  Menu,
  Button,
} from '@material-tailwind/react';
import {
  LogOut,
  Menu as MenuIcon,
  Xmark,
  Settings,
  Dashboard,
} from 'iconoir-react';
import { useAuth } from '@/lib/authProvider';

// Links da navegação (sem ícones)
const NAVIGATION_LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Plans",
    href: "/plans",
  },
  {
    title: "Support",
    href: "/support",
  },
];

function NavList() {
  return (
    <>
      {NAVIGATION_LINKS.map(({ title, href }) => (
        <List.Item key={title} as="a" href={href} className="px-3 py-2">
          <Typography type="small" className="font-medium">
            {title}
          </Typography>
        </List.Item>
      ))}
    </>
  );
}

function ProfileAvatar({ user, userName, firstLetter }) {
  if (user?.user_metadata?.avatar_url) {
    return (
      <Avatar
        src={user.user_metadata.avatar_url}
        alt={`Avatar de ${userName}`}
        size="sm"
        shape="circular"
        className="border border-primary cursor-pointer"
      />
    );
  }
  
  return (
    <div className="w-8 h-8 rounded-full border border-primary cursor-pointer bg-primary/10 flex items-center justify-center">
      <span className="text-sm font-bold text-primary">
        {firstLetter}
      </span>
    </div>
  );
}

function ProfileMenu({ user, logout, userName, firstLetter }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" as="a" href="/login">
          Login
        </Button>
        <Button variant="solid" size="sm" as="a" href="/register">
          Registrar
        </Button>
      </div>
    );
  }

  return (
    <Menu placement="bottom-end">
      <Menu.Trigger>
        <ProfileAvatar user={user} userName={userName} firstLetter={firstLetter} />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item as="a" href="/dashboard">
          <Dashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Menu.Item>
        <Menu.Item as="a" href="/settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Menu.Item>
        <hr className="my-1 border-surface" />
        <Menu.Item
          className="text-error hover:bg-error/10 cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export default function ComplexNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logout } = useAuth();

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  // Função para obter o nome do usuário
  const getUserName = () => {
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'U';
  };

  const userName = getUserName();
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U';

  // Debug logs
  console.log('User data:', user);
  console.log('User name:', userName);
  console.log('First letter:', firstLetter);

  return (
    <Navbar className="w-full max-w-none px-4 md:px-18 py-3 md:py-6 shadow-none border-b border-surface">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Typography
          as="a"
          href="/"
          type="h6"
          className="font-bold text-secondary-dark"
        >
          Churchment
        </Typography>

        {/* Links centralizados - Desktop */}
        <div className="hidden lg:block">
          <List className="flex flex-row items-center gap-1">
            <NavList />
          </List>
        </div>

        {/* Área direita - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Typography type="small" className="font-medium text-foreground">
                {userName}
              </Typography>
              <ProfileMenu 
                user={user} 
                logout={logout} 
                userName={userName} 
                firstLetter={firstLetter} 
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" as="a" href="/login" className='text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5'>
                Login
              </Button>
              <Button variant="solid" size="sm" as="a" href="/register">
                Registrar
              </Button>
            </div>
          )}
        </div>

        {/* Menu Mobile Toggle */}
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => setOpenNav(!openNav)}
          className="lg:hidden text-neutral-800 hover:border-neutral-800/5 hover:bg-neutral-800/5"
        >
          {openNav ? <Xmark className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </IconButton>
      </div>

      {/* Menu Mobile Collapse */}
      <Collapse open={openNav} className="lg:hidden">
        <div className="mt-4 pb-4">
          {/* Links de navegação */}
          <List className="flex flex-col gap-1">
            <NavList />
          </List>
          
          <hr className="my-3 border-surface" />
          
          {/* Profile section no mobile */}
          {user ? (
            <div className="flex items-center justify-between px-3 py-2">
              <Typography type="small" className="font-medium text-foreground">
                {userName}
              </Typography>
              <Menu placement="bottom-end">
                <Menu.Trigger>
                  <ProfileAvatar user={user} userName={userName} firstLetter={firstLetter} />
                </Menu.Trigger>
                <Menu.Content>
                  <Menu.Item as="a" href="/dashboard">
                    <Dashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Menu.Item>
                  <Menu.Item as="a" href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Menu.Item>
                  <hr className="my-1 border-surface" />
                  <Menu.Item
                    className="text-error hover:bg-error/10 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </div>
          ) : (
            /* Botões de auth no mobile para usuários não logados */
            <div className="px-3 flex flex-col gap-2">
              <Button variant="ghost" size="sm" as="a" href="/login" fullWidth className='inline-flex border font-medium font-sans text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none'>
                Login
              </Button>
              <Button variant="solid" size="sm" as="a" href="/register" fullWidth>
                Registrar
              </Button>
            </div>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}