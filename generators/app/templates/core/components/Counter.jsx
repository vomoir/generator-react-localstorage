/* eslint-disable react/prop-types */
export default function Counter({ numberChecked, totalNumber }) {
  return (
    <p>
      <b>{numberChecked}</b> / {totalNumber} items packed
    </p>
  );
}
