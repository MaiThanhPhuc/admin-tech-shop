import { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [relatedCategoryData, setRelatedCategoryData] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('FETCH');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://kltn-ecommerce.herokuapp.com/api/category',
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setRelatedCategoryData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleSave = () => {
    setLoading((prev) => !prev);
    let data = JSON.stringify({
      categoryName: categoryName,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/adminSys/category`,
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDI5NjliZWUxMTczOTZkNDg2YTRlMjMiLCJmaXJzdE5hbWUiOiJhZG1pblN5c3RlbSIsImxhc3ROYW1lIjoiYWRtaW5TeXN0ZW0iLCJyb2xlIjoiYWRtaW5TeXN0ZW0iLCJpc3MiOiJodHRwczovL2tsdG4tZWNvbW1lcmNlLmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWQiOiJhZG1pblN5c3RlbSIsImV4cCI6MTY4MTkxMTY0OCwiZW1haWwiOiJhZG1pblN5c3RlbSIsImF2dCI6ImFkbWluU3lzdGVtIn0.hB4qmmRvHz1RCm6zU8gxTNqLKSC4snLEpjzzgftU7Tg',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading((prev) => !prev);
      })
      .catch((error) => {
        setLoading((prev) => !prev);
        console.log(error);
      });
  };

  return (
    <>
      <Container
        sx={{
          bgcolor: '#fff',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Typography sx={{ fontSize: '24px', fontWeight: '600', paddingTop: '16px' }}>Category</Typography>
        <Box
          sx={{
            width: '30ch',
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            sx={{ m: 1 }}
            required
            id="outlined-basic"
            label="Name Category"
            variant="outlined"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Related Category</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectCategory}
              onChange={handleChange}
              label="Related Category"
            >
              {relatedCategoryData?.map((item) => (
                <MenuItem key={item.id} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ margin: '8px', width: '15ch' }}
            variant="contained"
            loading={loading}
          >
            Save
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
}

export default AddCategory;
