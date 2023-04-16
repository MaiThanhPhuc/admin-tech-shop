import { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import userService from '../../services/user.service';
import { toast } from 'react-toastify';
import { failPopUp, successPopUp } from '../../services/toast-up';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [relatedCategoryData, setRelatedCategoryData] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [choseCate, setChose] = useState();

  useEffect(() => {
    fetchAllCate();
  }, []);

  const fetchAllCate = async () => {
    const allCate = await userService.getAllCategory();
    setRelatedCategoryData(allCate.data);
  };

  const handleChangeCateName = (event) => {
    setSelectCategory(event.target.value);
  };

  const choseSubCateHandler = (event) => {
    console.log(event.target.value);
    setChose(event.target.value);
  };

  const handleSave = async () => {
    setLoading((prev) => !prev);
    console.log(categoryName);
    const data = await userService.addCategory(categoryName);
    setLoading((prev) => !prev);
    if (data.status === 200) {
      successPopUp('Add category success.');
      await fetchAllCate();
    } else {
      failPopUp(data.data);
    }
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
              onChange={handleChangeCateName}
              label="Related Category"
            >
              {relatedCategoryData?.map((item) => (
                <MenuItem key={item.id} value={item.id} onChange={choseSubCateHandler}>
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
