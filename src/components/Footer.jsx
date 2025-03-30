

export default function Footer() {
    const year = new Date().getFullYear();
  return (
    <div className="text-center">
      <p className="text-slate-500 ">
        &copy; {year} This Application is Developed & Maintained by &#160;
        <a
          style={{ textDecoration: 'underline' }}
          href="https://mohammedjawadsaleem11.github.io/portfolio/"
        >
          2x+1
        </a>
      </p>
    </div>
  );
}
