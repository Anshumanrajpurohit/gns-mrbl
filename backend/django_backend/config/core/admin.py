from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Collection,
    CollectionImage,
    CraftFeature,
    Craftsmanship,
    Review,
    Work,
    WorkImage,
)


admin.site.site_header = "Marble & Granite Administration"
admin.site.site_title = "Marble & Granite Admin"
admin.site.index_title = "Site Management"


class ImagePreviewMixin:
    @admin.display(description="Preview")
    def thumbnail_preview(self, obj):
        if getattr(obj, "image", None):
            return format_html(
                '<img src="{}" style="height: 60px; width: 60px; object-fit: cover; border-radius: 6px;" />',
                obj.image.url,
            )
        return "No image"


class CollectionImageInline(ImagePreviewMixin, admin.TabularInline):
    model = CollectionImage
    extra = 1
    fields = ("image", "thumbnail_preview")
    readonly_fields = ("thumbnail_preview",)


class WorkImageInline(ImagePreviewMixin, admin.TabularInline):
    model = WorkImage
    extra = 1
    fields = ("image", "thumbnail_preview")
    readonly_fields = ("thumbnail_preview",)


class CraftFeatureInline(admin.TabularInline):
    model = CraftFeature
    extra = 1


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1
    readonly_fields = ("created_at",)


@admin.register(Collection)
class CollectionAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "name",
        "thumbnail_preview",
        "type",
        "tag",
        "status",
        "featured",
        "order",
    )
    list_editable = ("status", "featured", "order")
    search_fields = ("name", "tag", "slug")
    list_filter = ("type", "status", "featured")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [CollectionImageInline]
    ordering = ("order", "name")
    list_per_page = 25
    readonly_fields = ("thumbnail_preview", "created_by", "created_at")
    fieldsets = (
        ("Content", {"fields": ("name", "slug", "type", "tag", "price_range", "description")}),
        ("Media", {"fields": ("image", "thumbnail_preview")}),
        ("Publishing", {"fields": ("status", "featured", "order")}),
        ("Audit", {"fields": ("created_by", "created_at")}),
    )

    def save_model(self, request, obj, form, change):
        if not obj.created_by_id and request.user.is_authenticated:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Craftsmanship)
class CraftsmanshipAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ("title", "thumbnail_preview", "status", "featured", "order", "created_at")
    list_editable = ("status", "featured", "order")
    search_fields = ("title", "description")
    list_filter = ("status", "featured")
    inlines = [CraftFeatureInline]
    ordering = ("order", "title")
    list_per_page = 25
    readonly_fields = ("thumbnail_preview", "created_by", "created_at")
    fieldsets = (
        ("Content", {"fields": ("title", "description")}),
        ("Media", {"fields": ("image", "thumbnail_preview")}),
        ("Publishing", {"fields": ("status", "featured", "order")}),
        ("Audit", {"fields": ("created_by", "created_at")}),
    )

    def save_model(self, request, obj, form, change):
        if not obj.created_by_id and request.user.is_authenticated:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Work)
class WorkAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "title",
        "thumbnail_preview",
        "location",
        "category",
        "status",
        "featured",
        "order",
    )
    list_editable = ("status", "featured", "order")
    search_fields = ("title", "location", "category", "slug")
    list_filter = ("category", "status", "featured")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [WorkImageInline, ReviewInline]
    ordering = ("order", "title")
    list_per_page = 25
    readonly_fields = ("thumbnail_preview", "created_by", "created_at")
    fieldsets = (
        ("Content", {"fields": ("title", "slug", "location", "category", "description")}),
        ("Media", {"fields": ("image", "thumbnail_preview")}),
        ("Publishing", {"fields": ("status", "featured", "order")}),
        ("Audit", {"fields": ("created_by", "created_at")}),
    )

    def save_model(self, request, obj, form, change):
        if not obj.created_by_id and request.user.is_authenticated:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "work", "rating", "created_at")
    search_fields = ("name", "work__title", "comment")
    list_filter = ("rating",)
    ordering = ("-created_at",)
    list_per_page = 25
    readonly_fields = ("created_at",)
    fieldsets = (
        (None, {"fields": ("work", "name", "rating", "comment", "created_at")}),
    )


@admin.register(CraftFeature)
class CraftFeatureAdmin(admin.ModelAdmin):
    list_display = ("point", "craft")
    search_fields = ("point", "craft__title")
    ordering = ("craft", "id")
