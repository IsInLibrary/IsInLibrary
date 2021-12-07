import * as React from "react";
import * as ReactDOM from "react-dom";

import "tailwindcss/tailwind.css";

import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  Chip,
  createTheme,
  ThemeProvider,
  Checkbox,
  ListItemText,
} from "@mui/material";
import type { BookStore } from "../url/checker";
import { PopupPadded } from "../style/styled-popup";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface IBookStoreElement {
  name: BookStore;
  korean: string;
}

export const bookStores: IBookStoreElement[] = [
  { name: "Amazon", korean: "아마존" },
  { name: "Aladin", korean: "알라딘" },
  { name: "Yes24", korean: "예스24" },
  { name: "Kyobo", korean: "교보문고" },
];

const Popup: React.FC = () => {
  const [selectedBookStores, setSelectedBookStores] = useState<
    IBookStoreElement[]
  >([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    let arr: any[] = value as any[];

    arr[arr.length - 1] = bookStores.find(
      (e) => e.name === arr[arr.length - 1]
    );

    const tail = arr[arr.length - 1] as IBookStoreElement;

    if (selectedBookStores.find((e) => e == tail)) {
      arr = arr.filter((e) => e !== tail);
    }

    setSelectedBookStores(arr);
  };

  return (
    <PopupPadded className="popup-padded">
      <div>
        <h1>Hello, World!</h1>
      </div>
      <div>
        <h1 className="text-blue-400">Tailwind Enabled if text is blue.</h1>
      </div>
      <div>
        <FormControl>
          <Typography
            fontSize="22px"
            style={{ color: "#eeebdd" }}
            className="my-0"
          >
            선택된 서점 목록
          </Typography>
          <Select
            className="mt-1 mb-0 py-0"
            multiple
            size="small"
            value={selectedBookStores}
            onChange={handleChange}
            renderValue={(selected) => {
              return (
                <Box className="flex h-full">
                  {selected.map((value) => (
                    <Chip
                      key={value.name}
                      label={value.korean}
                      className="flex-grow my-1 ml-5 mr-1"
                      style={{
                        backgroundColor: "#344CB7",
                        color: "#eeebdd",
                      }}
                    />
                  ))}
                </Box>
              );
            }}
            MenuProps={MenuProps}
            inputProps={{
              style: {
                padding: 0,
              },
            }}
          >
            <MenuItem disabled value="">
              <em>서점</em>
            </MenuItem>
            {bookStores.map((elem) => (
              <MenuItem key={elem.name} value={elem.name}>
                <Checkbox
                  checked={
                    selectedBookStores.findIndex((e) => e.name === elem.name) >
                    -1
                  }
                />
                <ListItemText primary={elem.korean} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </PopupPadded>
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Popup />
    </ThemeProvider>
  );
};

// --------------

ReactDOM.render(<Main />, document.getElementById("is-in-library"));
