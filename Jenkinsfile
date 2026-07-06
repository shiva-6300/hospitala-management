pipeline {
    agent any

    tools {
        jdk 'jdk'
        maven 'maven3'
    }

    stages {

        stage('Debug Workspace') {
            steps {
                sh '''
                    echo "Current Directory:"
                    pwd

                    echo "Workspace Contents:"
                    ls -R

                    echo "POM Location:"
                    find . -name pom.xml
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('hospital-management/backend') {
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

        always {
            cleanWs()
        }
    }
}
