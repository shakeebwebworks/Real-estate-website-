from django.urls import path
from . import views

urlpatterns = [
    path("properties/", views.PropertyListView.as_view(), name="property-list"),
    path("properties/<slug:slug>/", views.PropertyDetailView.as_view(), name="property-detail"),
    path("agents/", views.AgentListView.as_view(), name="agent-list"),
    path("agents/<int:pk>/", views.AgentDetailView.as_view(), name="agent-detail"),
    path("agents/<int:pk>/properties/", views.AgentPropertiesView.as_view(), name="agent-properties"),
    path("inquiries/", views.InquiryCreateView.as_view(), name="inquiry-create"),
    path("appointments/", views.AppointmentCreateView.as_view(), name="appointment-create"),
]