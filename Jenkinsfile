pipeline {
    agent any

    tools {
        jdk 'jdk'
        maven 'maven3'
    }

    stages {
        stage('Build') {
            steps {
                dir('backend') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }
    }

    post {
        success {
            echo 'Build Successful!'
        }
        failure {
            echo 'Build Failed!'
        }
    }
}
