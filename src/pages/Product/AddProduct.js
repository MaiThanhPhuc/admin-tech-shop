import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Product.scss';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import userService from '../../services/user.service';
import { failPopUp, successPopUp } from '../../services/toast-up';

export function AddProduct() {
  const [images, setImages] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [specs, setSpecs] = useState([]);

  const [initData, setInitData] = useState({});
  useEffect(() => {
    const fetchInitData = async () => {
      const respCate = await userService.getAllCategory();
      const respManu = await userService.getAllManufacture();
      setInitData({ ...initData, categories: respCate.data, manufacters: respManu.data });
    };
    fetchInitData();
  }, []);

  const handleMultipleImages = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
  };

  const converToSpecObj = () => {
    let specObjs = [];
    specs.forEach((spec) => {
      const specObj = specObjs.find((specObj) => specObj.groupName === spec.specGroup);
      if (specObj) {
        specObj.groupItems.push({
          name: spec.tskt,
          value: spec.specValue,
        });
      } else {
        specObjs.push({
          groupName: spec.specGroup,
          groupItems: [
            {
              name: spec.tskt,
              value: spec.specValue,
            },
          ],
        });
      }
    });

    return specObjs;
  };

  const addProduct = async (commonValues, specs, prodOtions) => {
    let productObj = {
      name: commonValues.name,
      description: commonValues.description,
      video: commonValues.video,
      // thumbnail: commonValues.image,
      category: {
        slug: commonValues.category,
      },
      manufacturer: {
        slug: commonValues.brand,
      },
    };
    const specObjs = converToSpecObj(specs);
    productObj = { ...productObj, specifications: specObjs, productOptions: prodOtions };

    const resp = await userService.addProduct(productObj);

    if (resp.status === 200) {
      successPopUp('Add Product Successfully.');
    } else {
      failPopUp(resp.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      video: '',
      thumb: '',
      category: '',
      description: '',
      brand: '',
    },
    onSubmit: (values) => {
      addProduct(values, specs, productOptions);
    },
  });

  const spectsForm = useFormik({
    initialValues: {
      specGroup: '',
      tskt: '',
      specValue: '',
    },
    onSubmit: (values) => {
      setSpecs([...specs, values]);
    },
  });

  const productOptionForm = useFormik({
    initialValues: {
      optionName: '',
      marketPrice: '',
      promotion: '',
      color: '',
      pictures: [],
    },
    onSubmit: (values) => {
      values.pictures = [values.pictures];
      setProductOptions((prev) => [...prev, values]);
      formik.setFieldValue('productOptions', productOptions);
      productOptionForm.resetForm();
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
              <label htmlFor="name">*Thumbnail sản phẩm</label>
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
                <label htmlFor="thumb" className="custom-input-image">
                  <div className="custom-input-image-body">
                    <AddPhotoAlternateOutlinedIcon />
                    Thêm Thumbnail
                  </div>
                </label>
                <input onChange={handleMultipleImages} id="thumb" name="thumb" type="file" hidden />
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
              <label htmlFor="video">*Video sản phẩm</label>
            </Box>
            <Box>
              <TextField
                sx={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                }}
                size="small"
                id="video"
                name="video"
                value={formik.values.video}
                onChange={formik.handleChange}
                error={formik.touched.video && Boolean(formik.errors.video)}
                helperText={formik.touched.video && formik.errors.video}
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
                style={{
                  flexBasis: '650px',
                  width: '650px',
                  maxWidth: '650px',
                  height: 300,
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
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
              <label>*Thương hiệu</label>
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
                <Select size="small" value={formik.values['brand']} onChange={(e) => handleChangeSelect('brand', e)}>
                  {initData?.manufacters?.map((manu) => (
                    <MenuItem key={manu.slug} value={manu.slug}>
                      {manu.name}
                    </MenuItem>
                  ))}
                </Select>
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
                  {initData?.categories?.map((item) => (
                    <MenuItem key={item.slug} value={item.slug}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
        {/* THONG TIN CHI TIET */}
        <Container sx={{ paddingY: '24px', bgcolor: '#fff', marginTop: 3 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Thông tin chi tiết</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
                  <label htmlFor="specGroup">Nhóm TSKT</label>
                </Box>
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  size="small"
                  id="specGroup"
                  name="specGroup"
                  value={spectsForm.values['specGroup']}
                  onChange={spectsForm.handleChange}
                  error={spectsForm.touched['specGroup'] && Boolean(spectsForm.errors['specGroup'])}
                  helperText={spectsForm.touched['specGroup'] && spectsForm.errors['specGroup']}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
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
                  <label htmlFor="tskt">TSKT</label>
                </Box>
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  size="small"
                  id="tskt"
                  name="tskt"
                  value={spectsForm.values['tskt']}
                  onChange={spectsForm.handleChange}
                  error={spectsForm.touched['tskt'] && Boolean(spectsForm.errors['tskt'])}
                  helperText={spectsForm.touched['tskt'] && spectsForm.errors['tskt']}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
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
                  <label htmlFor="specValue">Thông số</label>
                </Box>
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  size="small"
                  id="specValue"
                  name="specValue"
                  value={spectsForm.values['specValue']}
                  onChange={spectsForm.handleChange}
                  error={spectsForm.touched['specValue'] && Boolean(spectsForm.errors['specValue'])}
                  helperText={spectsForm.touched['specValue'] && spectsForm.errors['specValue']}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button size="small" color="primary" variant="contained" onClick={spectsForm.handleSubmit}>
                Thêm Thông số kỹ thuật
              </Button>
            </Grid>
          </Grid>
          {specs.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nhóm</TableCell>
                    <TableCell align="center">Tên TSKT</TableCell>
                    <TableCell align="center">Giá trị TSKT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {specs.map((spec) => (
                    <TableRow key={spec.specGroup} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        {spec.specGroup}
                      </TableCell>
                      <TableCell align="center">{spec.specValue}</TableCell>
                      <TableCell align="center">{spec.tskt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
        {/* thông tin bán hàng */}

        <Container sx={{ paddingY: '24px', bgcolor: '#fff', marginTop: 3, marginBottom: 10 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Thông tin bán hàng</Typography>
          <Grid container spacing={2}>
            {inputPrice.map((item, index) => (
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
                  <TextField
                    sx={{
                      width: '100%',
                    }}
                    size="small"
                    id={item.key}
                    name={item.key}
                    value={productOptionForm.values[item.key]}
                    onChange={productOptionForm.handleChange}
                    error={productOptionForm.touched[item.key] && Boolean(productOptionForm.errors[item.key])}
                    helperText={productOptionForm.touched[item.key] && productOptionForm.errors[item.key]}
                  />
                </Box>
              </Grid>
            ))}
            <Grid item xs={6}>
              <Button size="small" color="primary" sx={{ marginRight: 2 }} onClick={productOptionForm.resetForm}>
                Làm mới
              </Button>
              <Button size="small" color="primary" variant="contained" onClick={productOptionForm.handleSubmit}>
                Thêm phân loại
              </Button>
            </Grid>
          </Grid>
          {productOptions.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tên phân loại</TableCell>
                    <TableCell align="center">Màu</TableCell>
                    <TableCell align="center">Giá</TableCell>
                    <TableCell align="center">Khuyến mãi</TableCell>
                    <TableCell align="center">Hình ảnh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productOptions.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        {row.optionName}
                      </TableCell>
                      <TableCell align="center">{row.color}</TableCell>
                      <TableCell align="center">{row.marketPrice}</TableCell>
                      <TableCell align="center">{row.promotion}</TableCell>
                      <TableCell align="center">
                        <img src={row.image} alt={row.optionName} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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

var inputPrice = [
  {
    name: 'Tên phân loại',
    key: 'optionName',
    value: '',
    isRequired: true,
  },
  {
    name: 'Màu',
    key: 'color',
    value: '',
    isRequired: true,
  },
  {
    name: 'Giá',
    key: 'marketPrice',
    value: '',
    isRequired: true,
  },
  {
    name: 'Khuyến mãi',
    key: 'promotion',
    value: '',
    isRequired: false,
  },
  {
    name: 'Hình ảnh',
    key: 'pictures',
    value: '',
    isRequired: false,
  },
];
