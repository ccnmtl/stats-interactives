pipeline {
    agent any
    stages {
        stage('test') {
            sh 'make test'
        }
        stage('staging') {
            steps {
                sh 'make deploy-stage'
            }
        }
        stage('prod') {
            steps {
                sh 'make deploy-prod'
            }
        }
    }
}
