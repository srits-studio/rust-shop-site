import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="coin.png" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin={"true"}
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="bg-zinc-900 text-zinc-100 antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument