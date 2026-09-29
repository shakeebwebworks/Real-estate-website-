
from django.db import models
from django.utils.text import slugify


class Agent(models.Model):
    name = models.CharField(max_length=120)
    photo = models.ImageField(upload_to="agents/", blank=True)
    designation = models.CharField(max_length=120)
    location = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    biography = models.TextField(blank=True)
    experience_years = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Property(models.Model):
    TYPE_CHOICES = [
        ("apartment", "Apartment"),
        ("villa", "Villa"),
        ("luxury", "Luxury Home"),
        ("commercial", "Commercial"),
        ("plot", "Plot / Land"),
        ("penthouse", "Penthouse"),
    ]
    STATUS_CHOICES = [("sale", "For Sale"), ("rent", "For Rent"), ("sold", "Sold")]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    price = models.PositiveBigIntegerField(help_text="Price in rupees, e.g. 28000000")
    location = models.CharField(max_length=200, help_text="Area or neighbourhood")
    city = models.CharField(max_length=100)
    property_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="sale")
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    area = models.PositiveIntegerField(help_text="Area in sq.ft.")
    featured = models.BooleanField(default=False)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True, related_name="properties")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "properties"

    def save(self, *args, **kwargs):
        # Auto-create a clean URL like "luxury-villa-bangalore"
        if not self.slug:
            base = slugify(f"{self.title} {self.city}")
            slug, n = base, 2
            while Property.objects.filter(slug=slug).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="properties/")

    def __str__(self):
        return f"Image for {self.property.title}"


class Inquiry(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="inquiries")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self):
        return f"{self.name} ({self.created_at:%d %b %Y})"


class Appointment(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="appointments")
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.preferred_date}"