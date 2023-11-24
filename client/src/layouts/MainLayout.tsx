import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Helmet } from 'react-helmet'

interface MainLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    keywords: string;
}

const MainLayout = ({ children, title, description, keywords }: MainLayoutProps) => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <title>{title}</title>
            </Helmet>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

MainLayout.defaultProps = {
    title: "Todo's App",
    description: "Todo's App is a simple todo app that allows you to create, edit, and delete todos. The app is built using React, TypeScript, and the Tailwind CSS framework. The app is deployed to a server using Node.js and Express on aws lambda serverless architecture.",
    keywords: "Todo's App, Todo, App, React, TypeScript, Tailwind CSS, aws lambda, serverless architecture, Node.js, Express, aws, lambda, serverless, architecture, Node, Express, aws, lambda, serverless, architecture, Node, Express, aws, lambda, serverless, architecture"
}

export default MainLayout