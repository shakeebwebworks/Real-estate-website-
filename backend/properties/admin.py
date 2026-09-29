from django.contrib import admin
from .models import Agent, Appointment, Inquiry, Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3  # shows 3 empty upload slots


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("title", "city", "property_type", "status", "price", "featured", "agent")
    list_editable = ("featured", "status")  # tick "featured" straight from the list
    list_filter = ("city", "property_type", "status", "featured")
    search_fields = ("title", "city", "location")
    prepopulated_fields = {"slug": ("title", "city")}
    inlines = [PropertyImageInline]


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "location", "phone", "email")
    search_fields = ("name", "email")


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "property", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "phone")


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "property", "preferred_date", "preferred_time")
    list_filter = ("preferred_date",)
    search_fields = ("name", "email", "phone")