import React from "react";

const ContentContainer = (props) => {
  const {contentTitle} = props;
  return (
      <main>
        <h2>{contentTitle}</h2>
        {props.children}
      </main>
  )
}

export default ContentContainer;