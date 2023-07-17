import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
// import './App.css';
import LoginPage from "./pages/login/index";
import Postcard from "./pages/postcard/index";
import Preview from "./pages/postcard/prevew";
import Protected from "./routes/protected";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="postcard">
            <Route path="" element={<Protected Component={Postcard}/>} />
            <Route path="preview/:id" element={<Protected Component={Preview}/>} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
