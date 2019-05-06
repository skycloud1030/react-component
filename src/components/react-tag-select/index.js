import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Tag } from "antd";
import styles from "./index.cssm";
const CheckableTag = Tag.CheckableTag;

function Options(props) {
  const onChange = useCallback(index => props.onChange(props.value, index), []);
  return <CheckableTag {...props} onChange={onChange} />;
}

TagSelect.defaultProps = {
  value: [],
  onChange: () => {}
};
function TagSelect(props) {
  const { children } = props;
  const isMounted = useRef(false);
  const [selectedTags, setSelected] = useState(props.value);
  const handleChange = useCallback((tag, checked) => {
    setSelected(selectedTags => {
      if (checked) return [...selectedTags, tag];
      return selectedTags.filter(t => t !== tag);
    });
  }, []);

  const isTagSelectOption = useCallback(node => {
    return node && node.type && node.type.name === "Options";
  }, []);

  const onSelectAll = useCallback((_tag, checked) => {
    if (checked) {
      let selectedTags = children.map(child => child.props.value);
      setSelected(selectedTags);
    } else {
      setSelected([]);
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      props.onChange(selectedTags);
    }
  }, [selectedTags]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const checked_all = useMemo(() => children.length === selectedTags.length, [children, selectedTags]);

  return (
    <span className={styles.tagSelect}>
      <Options onChange={onSelectAll} checked={checked_all} value="all">
        All
      </Options>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          value: child.props.value,
          checked: selectedTags.indexOf(child.props.value) > -1,
          onChange: handleChange
        });
      })}
    </span>
  );
}

export { Options };
export default React.memo(TagSelect);
