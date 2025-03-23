import React, { useState } from "react";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };
  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  return (
    <>
      <p className="py-3 text-left text-sm text-gray-400">
        Licensed under the Apache License, Version 2.0.{" "}
        <span className="inline-block">
          (
          <a
            className="font-medium text-blue-500 hover:cursor-pointer hover:underline"
            onClick={openModal}
          >
            more info
          </a>
          )
        </span>
      </p>
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          onClick={closeModal}
        >
          <div
            className={`w-96 transform rounded-lg bg-white p-5 opacity-100 shadow-lg transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-left text-xl font-semibold">
              Copyright 2025 Lucas Clark
            </h2>
            <div className="text-left font-mono text-sm">
              <p>
                Licensed under the Apache License, Version 2.0 (the "License"); you may
                not use this file except in compliance with the License. You may obtain a
                copy of the License at
              </p>
              <a
                className="my-2 block font-medium text-blue-500 hover:cursor-pointer hover:underline"
                href="https://www.apache.org/licenses/LICENSE-2.0"
              >
                https://www.apache.org/licenses/LICENSE-2.0
              </a>{" "}
              <p>
                Unless required by applicable law or agreed to in writing, software
                distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
                WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
                License for the specific language governing permissions and limitations
                under the License.
              </p>
            </div>
            <button
              className="absolute right-2 top-0 p-2 text-2xl text-gray-500 hover:text-gray-600"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
