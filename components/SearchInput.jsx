import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Router } from '../routes/routes';

const searchInput = () => {
  let inputNode;

  const searchInputHandler = () => {
    const searchTerm = inputNode.inputRef.value;
    const href = `/search/${searchTerm}`;
    Router.pushRoute(href);
  };

  const enterKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      searchInputHandler();
    }
  };

  return (
    <div>
      <Input
        fluid
        action={
          <Button
            color="black"
            icon="search"
            content="Search"
            onClick={searchInputHandler}
          />}
        placeholder="Search..."
        defaultValue=""
        onKeyUp={enterKeyUpHandler}
        ref={input => inputNode = input}
      />
    </div>
  );
};

export default searchInput;
