import { Component, useEffect, useRef, useState } from "react";
import { theme } from "../../theme";

const CreateArticle = () => {
  return (
    <div>
      <form onSubmit={() => {}}>
        <label>
          Author
          <input type="text" />
        </label>
        <label>
          Title
          <input type="text" />
        </label>
        <label>
          Body
          <input type="textarea" />
        </label>
        <button>Submit Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
