import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {css} from './style';
import { Toaster, toast } from 'react-hot-toast';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useMediaQuery } from '@mui/material';

function App() {
  const [includeCapitalLetters, setIncludeCapitalLetters] = useState(false);
  const [includeLowerLetters, setIncludeLoweLetters] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState(5);
  const [password, setPassword] = useState('');
  const [passCopied, setPassCopied] = useState(false);

  const isXsScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  console.log(isXsScreen)

  const passGen = () => {
    if (!includeCapitalLetters && !includeLowerLetters && !includeNumbers && !includeSymbols) {
      return toast.error('Select atleast one option') 
    } 
    if (passwordLength < 1) {
      return toast.error('provide Password length more than 0')
    }
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characters = lowercaseLetters;

    if (includeCapitalLetters) characters += capitalLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    if (includeLowerLetters) characters += lowercaseLetters;

    let generatedPassword = '';
    for (let i = 0; i <= passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }
    setPassword(generatedPassword)
    let element: HTMLElement | null = document.getElementById('password');
    element ? element.innerHTML = generatedPassword : element = null;
  }

  const copyToClipboard = () => {
    setPassCopied(true)
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setPassCopied(false)
    }, 8000)
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const generateButtonSize = window.innerWidth < 600 ? 'large' : 'medium';

  console.log(generateButtonSize, '--')


  return (
    <>
    <Toaster position="top-center"/>
      <Grid direction='column' container sx={css.mainContainer}>
        <Container sx={css.passwordContainer}>
          <Box sx={css.displayContainer}>
            <Typography id='password' sx={{mt: 1, color: '#55595e'}} variant='h5'>Password</Typography>
          </Box>
          <Button onClick={copyToClipboard} sx={css.clipboardContainer}>
              {
                passCopied ? <DoneAllIcon /> : <ContentCopyIcon />
              }
          </Button>
        </Container>
        <Container sx={css.controllersContainer}>
              <Grid container spacing={2} sx={{padding: '20px', mt: 0}}>
              <Grid item xs={6} sx={css.optionContainer}>
              <Checkbox onChange={() => setIncludeCapitalLetters(!includeCapitalLetters)} {...label} />
              <Typography sx={{fontSize: {lg: '20px', md: '15px', xs: '10px'}, mt: {lg: 0, md: 1}}}>Include Uppercase</Typography>
              </Grid>
              <Grid item xs={6} sx={css.optionContainer}>
              <Checkbox onChange={() => setIncludeLoweLetters(!includeLowerLetters)} {...label} />
              <Typography sx={{fontSize: {lg: '20px', md: '15px', xs: '10px'}, mt: {lg: 0, md: 1}}}>Include Lowercase</Typography>
              </Grid>
              <Grid item xs={6} sx={css.optionContainer}>
              <Checkbox onChange={() => setIncludeNumbers(!includeNumbers)} {...label} />
              <Typography sx={{fontSize: {lg: '20px', md: '15px', xs: '10px'}, mt: {lg: 0, md: 1}}}>Include Numbers</Typography>
              </Grid>
              <Grid item xs={6} sx={css.optionContainer}>
              <Checkbox onChange={() => setIncludeSymbols(!includeSymbols)} {...label} />
              <Typography sx={{fontSize: {lg: '20px', md: '15px', xs: '10px'}, mt: {lg: 0, md: 1}}}>Include Symbols</Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={css.mainOptionContainer}>
              <TextField onChange={(e: React.ChangeEvent<HTMLInputElement> | String | any) => setPasswordLength(e.target.value)} value={passwordLength} sx={css.lengthTextfield} type='number' id="outlined-basic" label="Length" variant="outlined" />
              <Button onClick={passGen} sx={css.buttonStyle} variant='contained'>Generate</Button>
              </Grid>
        </Container>
      </Grid>
    </>
  );
}

export default App;
