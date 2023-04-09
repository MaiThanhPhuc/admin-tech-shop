import { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
const test = ['test', 'test2', 'test3'];
function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [relatedCategoryData, setRelatedCategoryData] = useState(test);
  const [selectCategory, setSelectCategory] = useState(test);
  const handleChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleSave = (data) => {
    console.log(categoryName);
    console.log(selectCategory);
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
              {relatedCategoryData.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleSave} sx={{ margin: '8px', width: '20ch' }} variant="contained">
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddCategory;
