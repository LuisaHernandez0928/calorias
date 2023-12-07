/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";

import { Button, Modal, Form, InputNumber, Input, Radio } from "antd";

import {
  addIngredient,
  searchIngredients,
  countNumberOfTimesAnIngredientIsUsed,
  orderIngredients,
  filterIngredients,
} from "./functions";

export function Ingredients({ data, recipes, notifyAdded }) {
  /*
    Data displayed
  */
  const [dataSearched, setDataSearched] = useState(data);

  /*
    Ordering
  */
  const optionsOrder = [
    { label: "Name", value: "name" },
    { label: "Calories", value: "calories" },
    { label: "Proteins", value: "proteins" },
  ];

  const [order, setOrder] = useState(optionsOrder[0].value);

  const changeOrder = (value) => {
    setOrder(value);
  };

  /*
  useEffect(() => {
    const mOrdered = orderIngredients(
      JSON.parse(JSON.stringify(dataSearched)),
      order
    );
    let same = true;
    if (mOrdered.lenght == dataSearched.lenght) {
      mOrdered.map((elem, i) => {
        if (elem.id != dataSearched[i].id) same = false;
      });
    } else same = false;
    if (!same) {
      setDataSearched(mOrdered);
    }
  }, [order, dataSearched]);
  */

  /* 
    Searching
  */
  const onSearch = (val) => {
    let searched = data;
    if (val !== "") {
      searched = searchIngredients(JSON.parse(JSON.stringify(data)), val);
    }
    if (searched != data) setDataSearched(searched);
  };

  /*
    Add
  */
  const [modalAdd, setModalAdd] = useState(false);

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
    const newData = addIngredient(
      JSON.parse(JSON.stringify(data)),
      values.name,
      values.calories,
      values.proteins,
      values.carbs,
      values.fats,
      values.sugars,
      values.gramsPerRation
    );
    notifyAdded(newData);
    handleOk();
  };

  /*
    Render
  */
  return (
    <div>
      <Button onClick={() => addButtonHandler()} type="primary">
        Add
      </Button>

      <div style={{ marginTop: "16px", marginBottom: "16px" }}>
        <Input.Search
          placeholder="Search ingredients"
          allowClear
          onSearch={onSearch}
        />
      </div>

      <div
        style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}
      >
        <div style={{ marginRight: "8px" }}>Order by: </div>
        <Radio.Group
          options={optionsOrder}
          onChange={(e) => changeOrder(e.target.value)}
          defaultValue={optionsOrder[0].value}
          optionType="button"
        />
      </div>

      <div>
        {dataSearched.map((ing) => {
          console.log("x");
          const times = countNumberOfTimesAnIngredientIsUsed(
            recipes,
            data,
            ing.name
          );
          return (
            <div
              key={ing.id}
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #ddd",
                paddingBottom: "16px",
                paddingTop: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "20px" }}>{ing.name}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}>Calories:</span>
                  {` ${ing.calories}`}
                </div>
                <div style={{ marginLeft: "16px" }}>{"|"}</div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>Proteins:</span>
                  {` ${ing.proteins}g`}
                </div>
                <div style={{ marginLeft: "16px" }}>{"|"}</div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>Fats:</span>
                  {` ${ing.fats}g`}
                </div>
                <div style={{ marginLeft: "16px" }}>{"|"}</div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>Sugars:</span>
                  {` ${ing.sugars}g`}
                </div>
                <div style={{ marginLeft: "16px" }}>{"|"}</div>
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ fontWeight: "bold" }}>Calories</span>
                  {` ${ing.carbs}g`}
                </div>
                <div style={{ marginLeft: "16px" }}>{"|"}</div>
                <div
                  style={{ marginLeft: "16px" }}
                >{`Used in ${times} recipes.`}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title="Add Ingredient"
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
            label="Calories"
            name="calories"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Proteins"
            name="proteins"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Carbs" name="carbs" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Fats" name="fats" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Sugars" name="sugars" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Grams Per Ration"
            name="gramsPerRation"
            rules={[{ required: true }]}
          >
            <InputNumber />
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
