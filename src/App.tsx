import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Navbar />
          
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;


const Layout = ( {children}: { children: React.ReactNode} ) => {
  return (
    <div id="layout">
      <div id="body">
        <main>{children}</main>
      </div>
    </div>
  );
}
