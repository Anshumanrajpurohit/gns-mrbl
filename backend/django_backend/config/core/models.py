from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify


class PublishStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PUBLISHED = "published", "Published"


def generate_unique_slug(instance, source_value: str) -> str:
    base_slug = slugify(source_value) or "item"
    slug = base_slug
    model_class = instance.__class__
    counter = 2

    while model_class.objects.filter(slug=slug).exclude(pk=instance.pk).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug


class Collection(models.Model):
    class CollectionType(models.TextChoices):
        MARBLE = "Marble", "Marble"
        GRANITE = "Granite", "Granite"

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    type = models.CharField(max_length=20, choices=CollectionType.choices)
    image = models.ImageField(upload_to="collections/")
    description = models.TextField()
    tag = models.CharField(max_length=100, blank=True)
    price_range = models.CharField(max_length=100, blank=True)
    status = models.CharField(
        max_length=10,
        choices=PublishStatus.choices,
        default=PublishStatus.DRAFT,
    )
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_collections",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "name"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["type"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class CollectionImage(models.Model):
    collection = models.ForeignKey(
        Collection,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="collections/gallery/")

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return f"{self.collection.name} image"


class Craftsmanship(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="craftsmanship/")
    description = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=PublishStatus.choices,
        default=PublishStatus.DRAFT,
    )
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_craftsmanship_entries",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self) -> str:
        return self.title


class CraftFeature(models.Model):
    craft = models.ForeignKey(
        Craftsmanship,
        on_delete=models.CASCADE,
        related_name="features",
    )
    point = models.CharField(max_length=255)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.point


class Work(models.Model):
    class CategoryChoices(models.TextChoices):
        FLOORING = "Flooring", "Flooring"
        COUNTERTOP = "Countertop", "Countertop"
        STAIRS = "Stairs", "Stairs"
        WALL_CLADDING = "Wall Cladding", "Wall Cladding"
        POOJA_ROOM = "Pooja Room", "Pooja Room"

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="work/")
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=120, choices=CategoryChoices.choices)
    description = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=PublishStatus.choices,
        default=PublishStatus.DRAFT,
    )
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_works",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "title"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["category"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class WorkImage(models.Model):
    work = models.ForeignKey(
        Work,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to="work/gallery/")

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return f"{self.work.title} image"


class Review(models.Model):
    work = models.ForeignKey(
        Work,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    name = models.CharField(max_length=120)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.rating}/5)"
