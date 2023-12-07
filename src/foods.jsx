/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";

import { Button, Modal, Form, Select, DatePicker } from "antd";

import {
  addFood,
  /*
  getFoodsByDay,
  getFoodsInRange,
  calculateNutritionalInfo
  */
} from "./functions";

export function Foods({ data, ingredients, recipes, notifyAdded }) {
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

  const optionsRec = recipes.map((rec) => ({
    label: rec.name,
    value: rec.id,
  }));

  const onSubmit = (values) => {
    const date =
      values.date.$D + "/" + (values.date.$M + 1) + "/" + values.date.$y;
    const newData = addFood(
      JSON.parse(JSON.stringify(data)),
      date,
      values.recipe
    );
    notifyAdded(newData);
    handleOk();
  };

  return (
    <div>
      <Button onClick={() => addButtonHandler()} type="primary">
        Add
      </Button>
      <div>
        {data.map((ing) => (
          <div key={ing.id}>{ing.name}</div>
        ))}
      </div>

      <Modal
        title="Add Food"
        open={modalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Form onFinish={onSubmit}>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Recipe" name="recipe" rules={[{ required: true }]}>
            <Select showSearch options={optionsRec} />
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
