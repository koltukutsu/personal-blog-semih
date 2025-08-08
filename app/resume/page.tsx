export const revalidate = 60;

export default function ResumePage() {
  const pdfPath = "/resume/Mehmet_Semih_Babacan_Resume.pdf";

  return (
    <article className="text-gray-800 dark:text-gray-300 mb-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold dark:text-gray-100">Resume</h1>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="mailto:m.semihbabacan@gmail.com"
            className="inline-flex text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm px-3 py-2 transition-[background-color]"
          >
            Reach me
          </a>
          <a
            href={pdfPath}
            download
            className="inline-flex text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm px-3 py-2 transition-[background-color]"
          >
            Download
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-md overflow-hidden border border-gray-200 dark:border-[#313131] bg-white dark:bg-black">
        <object
          data={pdfPath}
          type="application/pdf"
          width="100%"
          height="900px"
        >
          <div className="p-4 text-sm">
            <p>
              Your browser couldn’t display the PDF. You can
              {" "}
              <a className="underline" href={pdfPath} target="_blank" rel="noreferrer">
                open it in a new tab
              </a>
              {" "}
              or use the Download button above.
            </p>
          </div>
        </object>
      </div>
    </article>
  );
}

