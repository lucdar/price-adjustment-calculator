import React from "react";

const Header: React.FC = () => {
  const links = [
    { name: "Lucas Clark", href: "https://laclark.me/" },
    { name: "Blog Post", href: "https://laclark.me/blog/price-adjustment-calculator" },
    { name: "Source", href: "https://github.com/lucdar/price-adjustment-calculator" },
  ];
  return (
    <div className="p-y2 mb-3">
      <h1 className="text-left text-2xl font-bold">Price Adjustment Calculator</h1>
      <p className="text-left">
        by{" "}
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <a
              className="font-medium text-blue-500 hover:underline"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
            {index < links.length - 1 && " | "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default Header;
