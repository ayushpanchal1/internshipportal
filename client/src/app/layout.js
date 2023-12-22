import { Roboto } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from './components/CustomNavbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"></link>

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastContainer />
        <CustomNavbar />
        <div className='mt-2'>{children}</div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <Footer />
      </body>
    </html>
  );
}