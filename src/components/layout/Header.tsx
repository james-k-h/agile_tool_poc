import { Navbar, Container, Button, NavbarBrand } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const [name, setName] = useState<string>('');
  //   const { data: session } = useSession();

  //   useEffect(() => {
  //     if (session) {
  //       setName(session.user.name);
  //     }
  //   }, [session]);
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Agile Tool PoC</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="p-3">
            Signed in as: <a href="#login">Placeholder</a>
          </Navbar.Text>
          <Link href="/login>" passHref>
            <Button
            // onClick={() => signOut()}
            >
              Log out
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
