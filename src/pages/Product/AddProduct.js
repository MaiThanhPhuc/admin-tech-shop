import { Box, Button, Container, FormControl, Grid, ImageList, ImageListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Product.scss';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
const categoryTest = ['etst', 'sets'];
export function AddProduct() {
  const [images, setImages] = useState([]);

  const handleMultipleImages = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });

    setImages(selectedFIles);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      video: '',
      image: [],
      category: '',
      description: '',
      brand: '',
      battery: '',
      memory: '',
      displaySize: '',
      cameraResolution: '',
      ram: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChangeSelect = (key, event) => {
    formik.setFieldValue(key, event.target.value);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Container sx={{ paddingY: '24px', bgcolor: '#fff' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Thông tin cơ bản</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 3 }}>
            <Box
              sx={{
                flexBasis: '650px',
                width: '650px',
                maxWidth: '650px',
                display: 'flex',
                justifyContent: 'end',
                marginRight: 2,
                fontSize: '14px',
              }}
            >
              <label htmlFor="name">*Hình ảnh sản phẩm</label>
            </Box>
            <Box>
              <FormControl
                sx={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                }}
                fullWidth
              >
                <label htmlFor="image" className="custom-input-image">
                  <div className="custom-input-image-body">
                    <AddPhotoAlternateOutlinedIcon />
                    Thêm hình ảnh
                  </div>
                </label>
                <input multiple onChange={handleMultipleImages} id="image" name="image" type="file" hidden />
                {images.length > 0 && (
                  <ImageList sx={{ width: 650, height: 450 }} cols={3} rowHeight={164}>
                    {images.map((item) => (
                      <ImageListItem key={item}>
                        <img src={`${item}`} srcSet={`${item}`} alt="tes" loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Box
              sx={{
                flexBasis: '650px',
                width: '650px',
                maxWidth: '650px',
                display: 'flex',
                justifyContent: 'end',
                marginRight: 2,
                fontSize: '14px',
              }}
            >
              <label htmlFor="name">*Tên sản phẩm</label>
            </Box>
            <Box>
              <TextField
                sx={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                }}
                size="small"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 9 }}>
            <Box
              sx={{
                flexBasis: '650px',
                width: '650px',
                maxWidth: '650px',
                display: 'flex',
                justifyContent: 'end',
                marginRight: 2,
                fontSize: '14px',
              }}
            >
              <label htmlFor="name">*Mô tả sản phẩm</label>
            </Box>
            <Box>
              <ReactQuill
                id="description"
                name="description"
                label="Description"
                type="description"
                theme="snow"
                value={formik.values.description}
                onChange={formik.handleChange}
                style={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                  height: 300,
                }}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Box
              sx={{
                flexBasis: '650px',
                width: '650px',
                maxWidth: '650px',
                display: 'flex',
                justifyContent: 'end',
                marginRight: 2,
                fontSize: '14px',
              }}
            >
              <label htmlFor="name">*Loại sản phẩm</label>
            </Box>
            <Box>
              <FormControl
                sx={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                }}
                fullWidth
              >
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  onChange={(e) => handleChangeSelect('category', e)}
                >
                  {categoryTest.map((item, index) => (
                    <MenuItem value={index}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
        {/* chi tiet */}
        <Container sx={{ paddingY: '24px', bgcolor: '#fff', marginTop: 3 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Thông tin chi tiết</Typography>
          <Grid container spacing={2}>
            {inputDataDetail.map((item, index) => (
              <Grid key={index} item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      marginRight: 2,
                      fontSize: '14px',
                      width: 140,
                    }}
                  >
                    <label htmlFor={item.key}>{item.name}</label>
                  </Box>
                  {item?.isOption ? (
                    <FormControl
                      sx={{
                        width: '100%',
                      }}
                      fullWidth
                    >
                      <Select size="small" value={formik.values[item.key]} onChange={(e) => handleChangeSelect(item.key, e)}>
                        {item?.optionValue.map((item2, index) => (
                          <MenuItem key={index} value={item2}>
                            {item2}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      sx={{
                        width: '100%',
                      }}
                      size="small"
                      id={item.key}
                      name={item.key}
                      value={formik.values[item.key]}
                      onChange={formik.handleChange}
                      error={formik.touched[item.key] && Boolean(formik.errors[item.key])}
                      helperText={formik.touched[item.key] && formik.errors[item.key]}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <div className="button-group">
          <Button size="small" type="submit" sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button size="small" color="primary" variant="contained" type="submit" sx={{ marginRight: 2 }}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

var inputDataDetail = [
  {
    name: '*Thương hiệu',
    key: 'brand',
    value: '',
    isOption: true,
    optionValue: ['apple', 'samsung'],
  },
  {
    name: 'Dung lượng pin',
    key: 'battery',
    value: '',
  },
  {
    name: 'Dung lượng lưu trữ',
    key: 'memory',
    value: '',
    isOption: true,
    optionValue: ['512GB', '128GB', '256GB'],
  },
  {
    name: 'Kích thước màn hình',
    key: 'displaySize',
    value: '',
    isOption: true,
    optionValue: ['5.5inches', '5.8inches', '6inches'],
  },
  {
    name: 'Độ phân giải camera chính',
    key: 'cameraResolution',
    value: '',
    isOption: true,
    optionValue: ['12MP', '124MP', '24MP'],
  },
  {
    name: 'RAM',
    key: 'ram',
    value: '',
    isOption: true,
    optionValue: ['8GB', '32GB', '64GB'],
  },
];
