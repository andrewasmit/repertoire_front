import '../App.css';
import Header from './Header';
import MainContainer from './MainContainer';
import Footer from './Footer';
// Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';


function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <Header />
        <MainContainer />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
