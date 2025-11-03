import type { FC } from "react";

// Define the type for a single breadcrumb item
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export const Breadcrumb: FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex items-center space-x-2 sm:space-x-3 p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-xl"
      >
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              <div className="flex items-center">
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isCurrent
                      ? "text-yellow-400 cursor-default"
                      : "text-gray-200 hover:text-yellow-300"
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={(e) => isCurrent && e.preventDefault()}
                >
                  {item.label}
                </a>

                {/* Separator icon (not shown for the last item) */}
                {!isCurrent && (
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-gray-400 ml-2 sm:ml-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
