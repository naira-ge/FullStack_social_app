import React from "react";
import Navbar from '../Navbar/index'
import Footer from '../Footer/index'
import styles from './styles.module.scss'

const Layout = ({ children }) => {
    
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </>
  );
};

export default Layout;