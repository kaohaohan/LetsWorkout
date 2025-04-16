import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/workout/workout_bloc.dart';
import '../blocs/workout/workout_event.dart';
import '../blocs/workout/workout_state.dart';
import '../models/exercise.dart';
import 'add_set_screen.dart';

class ExerciseSelectionScreen extends StatefulWidget {
  const ExerciseSelectionScreen({Key? key}) : super(key: key);

  @override
  State<ExerciseSelectionScreen> createState() =>
      _ExerciseSelectionScreenState();
}

class _ExerciseSelectionScreenState extends State<ExerciseSelectionScreen> {
  String _searchQuery = '';
  String _selectedCategory = '全部';

  final List<String> _categories = [
    '全部',
    '胸部',
    '背部',
    '腿部',
    '肩部',
    '手臂',
    '核心',
    '有氧',
  ];

  @override
  void initState() {
    super.initState();
    // 加載運動項目
    context.read<WorkoutBloc>().add(LoadExercises());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('選擇運動'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48.0),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 16.0,
              vertical: 8.0,
            ),
            child: TextField(
              decoration: const InputDecoration(
                hintText: '搜索運動...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
                filled: true,
                fillColor: Colors.white,
              ),
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                });
              },
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          // 分類選擇器
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final category = _categories[index];
                final isSelected = category == _selectedCategory;

                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: ChoiceChip(
                    label: Text(category),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) {
                        setState(() {
                          _selectedCategory = category;
                        });
                      }
                    },
                  ),
                );
              },
            ),
          ),

          // 運動列表
          Expanded(
            child: BlocBuilder<WorkoutBloc, WorkoutState>(
              builder: (context, state) {
                if (state is ExercisesLoaded) {
                  final filteredExercises = _filterExercises(state.exercises);

                  if (filteredExercises.isEmpty) {
                    return const Center(child: Text('沒有找到符合條件的運動'));
                  }

                  return ListView.builder(
                    itemCount: filteredExercises.length,
                    itemBuilder: (context, index) {
                      final exercise = filteredExercises[index];
                      return _buildExerciseItem(exercise);
                    },
                  );
                }

                if (state is WorkoutLoading) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (state is WorkoutError) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('錯誤: ${state.message}'),
                        ElevatedButton(
                          onPressed: () {
                            context.read<WorkoutBloc>().add(LoadExercises());
                          },
                          child: const Text('重試'),
                        ),
                      ],
                    ),
                  );
                }

                return const Center(child: Text('加載運動項目...'));
              },
            ),
          ),
        ],
      ),
      // 底部添加新運動按鈕
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: 導航到添加新運動頁面 (後續開發)
        },
        backgroundColor: Colors.blue[100],
        child: const Icon(Icons.add, color: Colors.blue),
      ),
    );
  }

  // 過濾運動項目
  List<Exercise> _filterExercises(List<Exercise> exercises) {
    return exercises.where((exercise) {
      // 分類過濾
      if (_selectedCategory != '全部' && exercise.category != _selectedCategory) {
        return false;
      }

      // 搜索查詢過濾
      if (_searchQuery.isNotEmpty) {
        return exercise.name.toLowerCase().contains(_searchQuery.toLowerCase());
      }

      return true;
    }).toList();
  }

  // 構建運動項目卡片
  Widget _buildExerciseItem(Exercise exercise) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 4.0),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Theme.of(context).primaryColor,
          child: Text(
            exercise.name.substring(0, 1),
            style: const TextStyle(color: Colors.white),
          ),
        ),
        title: Text(exercise.name),
        subtitle: Text(exercise.bodyPart),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          // 添加調試輸出
          print('選擇了運動: ${exercise.name}');

          // 返回到訓練頁面，並傳遞選擇的運動
          Navigator.pop(context, exercise);
        },
      ),
    );
  }
}
