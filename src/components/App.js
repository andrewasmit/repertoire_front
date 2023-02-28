import '../App.css';
import Header from './Header';
import MainContainer from './MainContainer';
import Footer from './Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';


function App() {
  return (
    <div id="App">
      <Container maxWidth>
        <Header />
        <MainContainer />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
