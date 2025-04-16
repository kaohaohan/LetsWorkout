import 'dart:convert';

class Exercise {
  final String id;
  final String name;
  final String bodyPart;
  final String category;
  final String? description;
  final String? imageUrl;

  Exercise({
    required this.id,
    required this.name,
    required this.bodyPart,
    required this.category,
    this.description,
    this.imageUrl,
  });

  factory Exercise.fromJson(Map<String, dynamic> json) {
    return Exercise(
      id: json['_id'],
      name: json['name'],
      bodyPart: json['bodyPart'],
      category: json['category'],
      description: json['description'],
      imageUrl: json['imageUrl'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'bodyPart': bodyPart,
      'category': category,
      'description': description,
      'imageUrl': imageUrl,
    };
  }
}
