/* eslint-disable react/prop-types */

import React, { useState } from "react";

import { Button, Modal, Form, Input, Select } from "antd";

import {
  addRecipe,
  searchRecipes,
  /*
  orderRecipes,
  filterRecipes,
  getIngredientsInCommon,
  */
} from "./functions";

export function Recipes({ data, ingredients, notifyAdded }) {
  const [modalAdd, setModalAdd] = useState(false);

  const [dataSearched, setDataSearched] = useState(data);

  const onSearch = (val) => {
    let searched = data;
    if (val !== "") {
      searched = searchRecipes(JSON.parse(JSON.stringify(data)), val);
    }
    setDataSearched(searched);
  };

  const addButtonHandler = () => {
    setModalAdd(!modalAdd);
  };

  const handleCancel = () => {
    addButtonHandler();
  };

  const handleOk = () => {
    addButtonHandler();
  };

  const optionsIng = ingredients.map((ing) => ({
    label: ing.name,
    value: ing.id,
  }));

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

  return (
    <div>
      <div style={{ display: "flex", marginTop: "16px", marginBottom: "16px" }}>
        <Input.Search
          placeholder="Search recipes"
          allowClear
          onSearch={onSearch}
        />
        <div style={{ marginLeft: "16px" }}>
          <Button onClick={() => addButtonHandler()} type="primary">
            Add
          </Button>
        </div>
      </div>
      <div>
        {dataSearched.map((ing) => (
          <div key={ing.id}>{ing.name}</div>
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
