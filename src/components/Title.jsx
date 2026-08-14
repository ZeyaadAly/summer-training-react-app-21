function Title({
  name,
  title,
  children,
  className = "",
  as: Tag = "h1",
}) {
  const content = name || title || children;

  return (
    <div className={`title-wrapper ${className}`.trim()}>
      <Tag className="page-heading">{content}</Tag>
    </div>
  );
}

export default Title;
