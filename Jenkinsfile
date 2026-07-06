pipeline {
    agent any

    tools {
        jdk 'jdk'
        maven 'maven3'
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shiva-6300/hospitala-management.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('hospital-management/backend') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('hospital-management/backend') {
                    withSonarQubeEnv('sonar-scanner') {
                        sh '''
                            mvn sonar:sonar \
                            -Dsonar.projectKey=hospital-management \
                            -Dsonar.projectName=Hospital-Management
                        '''
                    }
                }
            }
        }

        stage('Trivy File System Scan') {
            steps {
                dir('hospital-management/backend') {
                    sh '''
                        trivy fs . \
                        --format table \
                        --severity HIGH,CRITICAL \
                        --exit-code 0
                    '''
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
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
        }
    }
}
