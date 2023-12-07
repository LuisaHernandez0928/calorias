/* eslint-disable react/prop-types */

import React, { useState } from "react";

import { Button, Modal, Form, Input, Select, Radio, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  addRecipe,
  searchRecipes,
  orderRecipes,
  filterRecipes,
} from "./functions";

const optionsOrder = [
  { label: "Name", value: "name" },
  { label: "Calories", value: "calories" },
  { label: "Proteins", value: "proteins" },
  { label: "Amount of Ingredients", value: "numingredients" },
];

const optionsFilter = [
  { label: "Calories", value: "calories" },
  { label: "Proteins", value: "proteins" },
];

const getInitialData = (data, ingredients, order) => {
  return orderRecipes(
    JSON.parse(JSON.stringify(data)),
    JSON.parse(JSON.stringify(ingredients)),
    order
  );
};

export function Recipes({ data, ingredients, notifyAdded }) {
  const optionsIng = ingredients.map((ing) => ({
    label: ing.name,
    value: ing.id,
  }));

  /*
    State Ordering
  */
  const [order, setOrder] = useState(optionsOrder[0].value);

  /*
    State Filtering
  */
  const [filter, setFilter] = useState(optionsFilter[0].value);
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");

  /*
    State Data searched
  */
  const [dataSearched, setDataSearched] = useState(
    getInitialData(data, ingredients, order)
  );

  /*
    State Data filtered
  */
  const [dataFiltered, setDataFiltered] = useState(
    getInitialData(data, ingredients, order)
  );

  /*
    State Modal
  */
  const [modalAdd, setModalAdd] = useState(false);

  /*
    Change order
  */
  const changeOrder = (mOrder) => {
    setOrder(mOrder);
    const mOrdered = orderRecipes(
      JSON.parse(JSON.stringify(dataSearched)),
      JSON.parse(JSON.stringify(ingredients)),
      mOrder
    );
    setDataSearched(mOrdered);
    let dataFiltered = mOrdered;
    if (filterStart != "" && filterEnd != "") {
      dataFiltered = filterRecipes(
        dataFiltered,
        JSON.parse(JSON.stringify(ingredients)),
        filter,
        filterStart,
        filterEnd
      );
    }
    setDataFiltered(dataFiltered);
  };

  /*
    Change filter
  */
  const changeFilter = (mFilter) => {
    setFilter(mFilter);
    if (filterStart != "" && filterEnd != "") {
      const mFiltered = filterRecipes(
        JSON.parse(JSON.stringify(dataSearched)),
        JSON.parse(JSON.stringify(ingredients)),
        mFilter,
        parseInt(filterStart),
        parseInt(filterEnd)
      );
      setDataSearched(mFiltered);
    }
  };

  const changeFilterStart = (value) => {
    if (!value) {
      setFilterStart("");
      setDataSearched(getInitialData(data, order));
      setDataFiltered(getInitialData(data, order));
    } else {
      setFilterStart(`${value}`);
      if (filterEnd != "") {
        const mFiltered = filterRecipes(
          JSON.parse(JSON.stringify(dataSearched)),
          JSON.parse(JSON.stringify(ingredients)),
          filter,
          parseInt(value),
          parseInt(filterEnd)
        );
        setDataFiltered(mFiltered);
      }
    }
  };

  const changeFilterEnd = (value) => {
    if (!value) {
      setFilterEnd("");
      setDataSearched(getInitialData(data, order));
      setDataFiltered(getInitialData(data, order));
    } else {
      setFilterEnd(`${value}`);
      if (filterStart != "") {
        const mFiltered = filterRecipes(
          JSON.parse(JSON.stringify(dataSearched)),
          JSON.parse(JSON.stringify(ingredients)),
          filter,
          parseInt(filterStart),
          parseInt(value)
        );
        setDataFiltered(mFiltered);
      }
    }
  };

  /* 
    Trigger Searching
  */
  const onSearch = (val) => {
    let searched = data;
    if (val !== "") {
      searched = searchRecipes(JSON.parse(JSON.stringify(data)), val);
    }
    if (searched != dataSearched) {
      const dataFound = JSON.parse(JSON.stringify(searched));
      setDataSearched(
        orderRecipes(dataFound, JSON.parse(JSON.stringify(ingredients)), order)
      );
      let dataFiltered = dataFound;
      if (filterStart != "" && filterEnd != "") {
        dataFiltered = filterRecipes(
          dataFound,
          JSON.parse(JSON.stringify(ingredients)),
          filter,
          filterStart,
          filterEnd
        );
      }
      setDataFiltered(dataFiltered);
    }
  };

  /*
    Trigger Add
  */
  const addButtonHandler = () => {
    setModalAdd(!modalAdd);
  };

  const handleCancel = () => {
    addButtonHandler();
  };

  const handleOk = () => {
    addButtonHandler();
  };

  const onSubmit = (values) => {
    const amounts = values.amounts.split(",").map((elem) => parseInt(elem));
    const newData = addRecipe(
      JSON.parse(JSON.stringify(data)),
      values.name,
      values.ingredients,
      amounts
    );
    notifyAdded(newData);
    handleOk();
  };

  /*
    Render
  */
  return (
    <div>
      <div style={{ display: "flex", marginTop: "16px", marginBottom: "16px" }}>
        <Input.Search
          placeholder="Search recipes"
          allowClear
          onSearch={onSearch}
        />
        <div style={{ marginLeft: "16px" }}>
          <Button
            icon={<PlusOutlined />}
            onClick={() => addButtonHandler()}
            type="primary"
          >
            Add Recipe
          </Button>
        </div>
      </div>

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "8px", fontWeight: "bold" }}>Order by:</div>
        <Radio.Group
          options={optionsOrder}
          onChange={(e) => changeOrder(e.target.value)}
          defaultValue={optionsOrder[0].value}
          optionType="button"
        />

        <div
          style={{ marginRight: "8px", marginLeft: "16px", fontWeight: "bold" }}
        >
          Filter by:
        </div>
        <Radio.Group
          options={optionsFilter}
          onChange={(e) => changeFilter(e.target.value)}
          defaultValue={optionsFilter[0].value}
          optionType="button"
        />
        <div style={{ marginLeft: "8px", marginRight: "8px" }}>Start:</div>
        <InputNumber onChange={changeFilterStart} />
        <div style={{ marginLeft: "8px", marginRight: "8px" }}>End:</div>
        <InputNumber onChange={changeFilterEnd} />
      </div>

      <div style={{ borderTop: "1px solid #ddd" }}>
        {dataFiltered.map((ing, i) => (
          <div
            style={{
              fontWeight: "bold",
              borderBottom: "1px solid #ddd",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: i % 2 == 0 ? "white" : "#eee",
            }}
            key={ing.id}
          >
            {ing.name}
          </div>
        ))}
      </div>

      <Modal
        title="Add Recipes"
        open={modalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form onFinish={onSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Input name..." />
          </Form.Item>
          <Form.Item
            label="Ingredients"
            name="ingredients"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" options={optionsIng} />
          </Form.Item>
          <div>Ingredients amount (with commas, same order as ingredients)</div>
          <Form.Item
            label="Amounts"
            name="amounts"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
