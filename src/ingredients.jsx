/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";

import { Button, Modal, Form, InputNumber, Input, Radio } from "antd";

import {
  addIngredient,
  searchIngredients,
  countNumberOfTimesAnIngredientIsUsed,
  orderIngredients,
  /*
  filterIngredients,
  */
} from "./functions";

export function Ingredients({ data, recipes, notifyAdded }) {
  const [modalAdd, setModalAdd] = useState(false);

  const [dataSearched, setDataSearched] = useState(data);

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

  const onSearch = (val) => {
    let searched = data;
    if (val !== "") {
      searched = searchIngredients(JSON.parse(JSON.stringify(data)), val);
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
          const times = countNumberOfTimesAnIngredientIsUsed(
            recipes,
            data,
            ing.name
          );
          return <div key={ing.id}>{`${ing.name} | used ${times} times`}</div>;
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
