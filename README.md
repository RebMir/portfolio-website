# AWS Hosted Portfolio Website

## 📋 Project Overview
Professional portfolio website hosted entirely on AWS using serverless architecture.

## 🏗️ Architecture
Browser → CloudFront (CDN) → S3 Bucket (Origin)
↳ Route 53 (DNS) + ACM (SSL)

## 🔧 AWS Services Used
1. **Amazon S3** - Static website hosting
2. **Amazon CloudFront** - Content delivery & HTTPS
3. **Amazon Route 53** - DNS management
4. **AWS Certificate Manager** - Free SSL/TLS certificates

## 💰 Cost Analysis
- Monthly: $2.10
- Annual: $25.20
- One-time: Domain registration ($12)

## 🚀 Deployment Steps
1. Create S3 bucket with public access
2. Configure CloudFront distribution
3. Request SSL certificate from ACM
4. Set up DNS records in Route 53
5. Upload website files

## 📈 Performance
- Load time: < 2 seconds
- Availability: 99.9%
- Security: A+ SSL rating

## 🔗 Live Demo
https://yourname.cloud