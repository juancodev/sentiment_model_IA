import { ChangeEvent, useState, useRef, useEffect } from "react";
import { parse } from "csv-parse";
import ScrollReveal from "scrollreveal";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Content } from "@/Components/Content/Index";

const Upload = (): JSX.Element => {
  const [records, setRecords] = useState<Array<string>>([]);
  const [fileData, setFileData] = useState<File>();
  const formCSV = useRef(null);

  useEffect(() => {
    if (formCSV.current) {
      const config = {
        distance: "18%",
        origin: "top",
        opacity: 0.4,
        duration: 1500,
      };
      ScrollReveal().reveal(formCSV.current, config);
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setFileData(file);

    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      console.log("Solo CSV");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      const recordsArray: Array<string> = [];

      const parser = parse(fileContent, {
        delimiter: ",",
        trim: true,
      });

      parser
        // .on("readable", () => {
        //   let record;
        //   while ((record = parser.read()) !== null) {
        //     setRecords(record);
        //   }
        // })
        .on("data", (row) => {
          recordsArray.push(row);
        })
        .on("end", () => {
          setRecords(recordsArray);
          console.log("Lectura de CSV Finalizada");
        });
    };
    reader.readAsText(file);
  };

  if (fileData) {
    return (
      <>
        <form ref={formCSV}>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Sube un archivo.
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <p className="pl-1">{fileData?.name} </p>{" "}
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-blue-800"
                  >
                    {" - "}
                    <span> Subir otro archivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Recuerda que deben ser .csv
                </p>
              </div>
            </div>
          </div>
        </form>
        <div>{records.length > 0 ? <Content records={records} /> : null}</div>
      </>
    );
  } else {
    return (
      <>
        <form ref={formCSV}>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ¡Carga un .csv para que veas la magia 🎉!
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-bold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-blue-800"
                  >
                    <span>Subir un archivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">o arrastarlo y soltar</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  .CSV hasta 10MB
                </p>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
};

export { Upload };
