import { Box, Button, Container, FormControl, Grid, ImageList, ImageListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
function AddStore() {
  const [inputDataDetail, setInputDataDetail] = useState(InputDataDetail);
  const [vnAddress, setVnAddress] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${window.location.origin}/vnAddress.json`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setVnAddress(response.data);
        importAddressToInput(
          'city',
          response.data.map((item) => item.city),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const importAddressToInput = (key, data) => {
    setInputDataDetail((prev) => {
      const provinceInput = prev.find((item) => item.key === key);
      provinceInput.optionValue = [...new Set(data)];
      return [...prev];
    });
  };

  const loadDistrict = (cityName) => {
    const districtNames = vnAddress.filter((item) => item.city === cityName);
    return [...new Set(districtNames.map((item) => item.district))];
  };

  const loadWard = (districtName) => {
    const wardNames = vnAddress.filter((item) => item.district === districtName);
    return [...new Set(wardNames.map((item) => item.ward))];
  };

  const clickAddressHandler = (option, key) => {
    if (key === 'city') {
      const districts = loadDistrict(option);
      importAddressToInput('district', districts);
    } else if (key === 'district') {
      const wards = loadWard(option);
      importAddressToInput('ward', wards);
    }
  };

  const handleChangeSelect = (key, e) => {
    setInputDataDetail((prev) => {
      const dataInput = prev.find((item) => item.key === key);
      dataInput.value = e.target.value;
      return [...prev];
    });
  };

  const saveNewShopHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const addressUser = {
      province: InputDataDetail[0].value,
      district: InputDataDetail[1].value,
      ward: InputDataDetail[2].value,
      fullAddress: InputDataDetail[3].value,
      phone: InputDataDetail[4].value,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/adminSys/shop`, addressUser, {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDJjMmVlMjAxN2M0MTUyYmRmMzJiZGUiLCJmaXJzdE5hbWUiOiJhZG1pblN5c3RlbSIsImxhc3ROYW1lIjoiYWRtaW5TeXN0ZW0iLCJyb2xlIjoiYWRtaW5TeXN0ZW0iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiaWQiOiJhZG1pblN5c3RlbSIsImV4cCI6MTY4MTkxMzE4OCwiZW1haWwiOiJhZG1pblN5c3RlbSIsImF2dCI6ImFkbWluU3lzdGVtIn0.PjLl3k6XB8zD3cGbOTycjnDPnGSsOxdE2SNKh7SxTPs',
        },
      })
      .then((resp) => {
        setLoading(false);
      });
  };

  return (
    <>
      <form>
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
                      <Select
                        size="small"
                        // value={formik.values[item.key]}
                        onChange={(e) => handleChangeSelect(item.key, e)}
                      >
                        {item?.optionValue.map((itemOption, index) => (
                          <MenuItem key={index} value={itemOption} onClick={() => clickAddressHandler(itemOption, item.key)}>
                            {itemOption}
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
                      onChange={(e) => handleChangeSelect(item.key, e)}
                      //   value={formik.values[item.key]}
                      //   onChange={formik.handleChange}
                      //   error={formik.touched[item.key] && Boolean(formik.errors[item.key])}
                      //   helperText={formik.touched[item.key] && formik.errors[item.key]}
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
          {/* <LoadingButton onClick={saveNewShopHandler} size="small" color="primary" variant="contained" type="submit" sx={{ marginRight: 2 }}>
            Submit
          </LoadingButton> */}
          <LoadingButton
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={saveNewShopHandler}
            sx={{ marginRight: 2 }}
            variant="contained"
            loading={loading}
            size="small"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
var InputDataDetail = [
  {
    name: 'Tỉnh/Thành',
    key: 'city',
    value: '',
    isOption: true,
    optionValue: [],
  },
  {
    name: 'Quận/Huyện',
    key: 'district',
    value: '',
    isOption: true,
    optionValue: [],
  },
  {
    name: 'Phường/Xã',
    key: 'ward',
    value: '',
    isOption: true,
    optionValue: [],
  },
  {
    name: 'Địa chỉ',
    key: 'address',
    value: '',
  },
  {
    name: 'Số điện thoại',
    key: 'phone',
    value: '',
  },
];
export default AddStore;
