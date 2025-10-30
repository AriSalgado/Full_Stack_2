# Backend (Spring Boot)

This project has been updated to target Java 21 (LTS).

Prerequisites
- Install JDK 21 and set JAVA_HOME to its installation folder. On Windows, download an Adoptium/Eclipse Temurin or other JDK 21 build and set environment variables.
- Maven (the project includes the Maven wrapper `mvnw` so you can use `mvnw.cmd`).

Build

Open PowerShell and run:

```powershell
# from project root
mvnw.cmd -v; mvnw.cmd clean package -DskipTests
```

Run

```powershell
# run the packaged jar
java -jar target\backend-0.0.1-SNAPSHOT.jar
```

Notes
- If your system `java -version` still points to a different JDK, ensure `JAVA_HOME` is set and `PATH` points to `%JAVA_HOME%\bin`.
- If you use an IDE, configure its JDK to 21 for this project.
