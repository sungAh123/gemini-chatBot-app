FROM php:8.2-apache

# 앱 복사
COPY . /var/www/html/

# 포트 노출
EXPOSE 80

CMD ["apache2-foreground"]