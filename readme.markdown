This installation guide provides step-by-step instructions to set up and
install Ujyalo Krishi. Following these guidelines, you can install the
application on your local machine and prepare it for use. The guide
covers system requirements, source code setup, database configuration,
environment variable configuration, dependency installation, application
building, and server starting. Additionally, it provides tips for
troubleshooting and testing the application. Whether you are a developer
or not, this installation guide will assist you in getting Ujyalo Krishi
up and running smoothly on your system.

1.  **System Requirements:**

> Before proceeding with the installation, ensure that your system meets
> the following minimum requirements:

-   Operating System: Windows, macOS, or Linux

-   Node.js: Version 16 or above

-   MySQL: Version 8 or above

2.  **Clone or Download the Source Code:**

    -   Visit the GitHub repository for Ujyalo Krishi at:
        <https://github.com/rohanpoudel2/ujyaloKrishi_NextJS>.

    -   Clone the repository to your local machine using Git or download
        the source code as a ZIP file.

    -   Extract the downloaded ZIP file to a desired location on your
        computer.

3.  **Set Up the Database:**

    -   Install and set up MySQL on your system.

    -   Create a new database for Ujyalo Krishi.

    -   Import the provided database script to execute the necessary SQL
        queries to set up the required tables and schema.

4.  **Configure Environment Variables:**

    -   Open the **connect.js** file of the api directory and configure
        the following parameters:

        -   **host**: Hostname or IP address of your MySQL database
            server, mostly it is **localhost**.

        -   **port**: Port number for the MySQL database server.

        -   **user**: Username for accessing the MySQL database.

        -   **password**: Password for the MySQL database user.

        -   **database**: Name of the database created for Ujyalo
            Krishi.

5.  **Install Dependencies:**

    -   Open a terminal or command prompt and navigate to the **api**
        directory of the downloaded source code.

    -   Run the command **npm install** to install the required
        dependencies for the backend server.

    -   Navigate to the **client** directory within the source code.

    -   Run the command **npm install** to install the required
        dependencies for the front end.

6.  **Build and Start the Application:**

-   Start the MySQL database.

    -   In the terminal or command prompt, navigate to the **api**
        directory of the source code.

    -   Run the command **npm start** to start the server.

    -   Once the server is started, navigate to the **client**
        directory, and run the command **npm run dev** to start the
        NextJS application.

    -   Access the Ujyalo Krishi application in a web browser by
        entering [**http://localhost:3000**](http://localhost:3000).

7.  **Testing and Verification:**

    -   Open the Ujyalo Krishi application in your web browser.

    -   Verify that the application functions correctly and that all
        features work as expected.

8.  **Troubleshooting:**

    -   If you encounter any issues during the installation or setup,
        refer to the official documentation or community forums for
        Next.js, Express.js, and MySQL.

    -   Check for error messages or log files that may provide insights
        into the problem.

    -   Ensure you have installed the necessary dependencies and
        versions, as mentioned in the system requirements.

**Note: The installation guidelines above assume a basic understanding
of the required technologies.**
[**Link to HuggingFace Repository**](https://huggingface.co/spaces/hacksberg/plant/tree/main)
