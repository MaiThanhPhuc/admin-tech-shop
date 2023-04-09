import { Box, Button, Container, FormControl, Grid, ImageList, ImageListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function AddStore() {
  const [inputDataDetail, setInputDataDetail] = useState(InputDataDetail);
  const [vnAddress, setVnAddress] = useState();
  console.log(inputDataDetail);
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
          <Button size="small" color="primary" variant="contained" type="submit" sx={{ marginRight: 2 }}>
            Submit
          </Button>
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
