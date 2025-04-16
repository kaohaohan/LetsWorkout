import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/workout/workout_bloc.dart';
import '../blocs/workout/workout_event.dart';
import '../blocs/workout/workout_state.dart';
import '../models/workout.dart';
import '../models/exercise.dart';
import '../models/workout_set.dart';
import 'exercise_selection_screen.dart';

class WorkoutScreen extends StatefulWidget {
  final Workout workout;

  const WorkoutScreen({Key? key, required this.workout}) : super(key: key);

  @override
  State<WorkoutScreen> createState() => _WorkoutScreenState();
}

class _WorkoutScreenState extends State<WorkoutScreen> {
  Exercise? _selectedExercise;
  final List<SetInfo> _currentSets = [];
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _repsController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _addEmptySet();
  }

  @override
  void dispose() {
    _weightController.dispose();
    _repsController.dispose();
    super.dispose();
  }

  void _addEmptySet() {
    setState(() {
      _currentSets.add(SetInfo(weight: 0.0, reps: 0));
    });
  }

  void _updateSet(int index, double weight, int reps) {
    setState(() {
      _currentSets[index] = SetInfo(weight: weight, reps: reps);
    });
  }

  void _deleteSet(int index) {
    setState(() {
      _currentSets.removeAt(index);
    });
  }

  void _selectExercise() async {
    final Exercise? result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const ExerciseSelectionScreen()),
    );

    // 調試輸出
    print('返回結果: ${result?.name ?? "無選擇"}');

    if (result != null) {
      // 清空現有組數並添加一個空組數
      _currentSets.clear();

      // 設置選擇的運動並重建界面
      setState(() {
        _selectedExercise = result;
        _addEmptySet();
      });

      // 強制重建以顯示選擇的運動
      Future.microtask(() => setState(() {}));

      // 調試輸出
      print('設置選擇的運動: ${_selectedExercise?.name}, 組數: ${_currentSets.length}');
    }
  }

  void _saveWorkoutSet() {
    if (_selectedExercise == null) return;

    // 過濾掉空的組數
    final validSets =
        _currentSets.where((set) => set.weight > 0 && set.reps > 0).toList();

    if (validSets.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('請至少添加一組有效數據')));
      return;
    }

    // 添加組數
    context.read<WorkoutBloc>().add(
      AddWorkoutSet(
        exerciseId: _selectedExercise!.id,
        workoutName: _selectedExercise!.name,
        sets: validSets,
      ),
    );

    // 清理選擇的運動和組數
    setState(() {
      _selectedExercise = null;
      _currentSets.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 自定義頂部欄
        Container(
          padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: SafeArea(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () => Navigator.pop(context),
                ),
                Text(
                  "訓練",
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white),
                  onPressed: () => _showCancelConfirmation(context),
                ),
              ],
            ),
          ),
        ),

        // 主體內容
        Expanded(
          child: BlocConsumer<WorkoutBloc, WorkoutState>(
            listener: (context, state) {
              if (state is WorkoutCompleted) {
                // 當訓練完成時，返回到主頁
                Navigator.pop(context);
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text('訓練完成！')));
              } else if (state is WorkoutError) {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(state.message)));
              }
            },
            builder: (context, state) {
              // 如果選擇了運動，或者有進行中的訓練，顯示訓練進行中界面
              if (_selectedExercise != null) {
                return _buildWorkoutInProgressBody(context, null);
              }

              if (state is WorkoutInProgress && state.workoutSets.isNotEmpty) {
                return _buildWorkoutInProgressBody(context, state);
              }

              // 加載中狀態
              if (state is WorkoutLoading) {
                return const Center(child: CircularProgressIndicator());
              }

              // 默認顯示空訓練視圖
              return _buildEmptyWorkoutBody(context);
            },
          ),
        ),

        // 底部按鈕
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16.0),
          child: ElevatedButton(
            onPressed: () {
              // 完成訓練
              context.read<WorkoutBloc>().add(FinishWorkout(widget.workout.id));
            },
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              backgroundColor: Colors.green,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              '完成訓練',
              style: TextStyle(fontSize: 18, color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }

  // 構建訓練進行中畫面
  Widget _buildWorkoutInProgressBody(
    BuildContext context,
    WorkoutInProgress? state,
  ) {
    // 調試輸出
    print(
      '構建訓練進行中畫面, 選擇的運動: ${_selectedExercise?.name}, 運動列表長度: ${state?.workoutSets.length ?? 0}',
    );

    List<WorkoutSet> workoutSets = state?.workoutSets ?? [];

    return Column(
      children: [
        // 運動列表
        Expanded(
          child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            children: [
              // 已添加的組數列表
              ...workoutSets
                  .map(
                    (workoutSet) => _buildWorkoutSetCard(context, workoutSet),
                  )
                  .toList(),

              // 如果選擇了運動，顯示當前正在添加的運動
              if (_selectedExercise != null) ...[
                const SizedBox(height: 16),
                _buildCurrentExerciseInput(),
              ],
            ],
          ),
        ),

        // 添加運動按鈕
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: OutlinedButton(
            onPressed: _selectExercise,
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text('添加運動', style: TextStyle(fontSize: 16)),
          ),
        ),
      ],
    );
  }

  // 構建當前選擇的運動輸入界面
  Widget _buildCurrentExerciseInput() {
    // 調試輸出
    print('構建運動輸入界面: ${_selectedExercise?.name}, 當前組數: ${_currentSets.length}');

    if (_selectedExercise == null) {
      // 避免不必要的錯誤
      print('警告：_selectedExercise為null');
      return const SizedBox.shrink();
    }

    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 16.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 運動名稱
            Text(
              _selectedExercise!.name,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),

            // 運動資訊
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '目標肌群: ${_selectedExercise?.bodyPart ?? ""}',
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  Text(
                    '分類: ${_selectedExercise?.category ?? ""}',
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                ],
              ),
            ),

            const Divider(),

            // 組數列表標題
            const Text(
              '添加組數',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 12),

            // 組數輸入
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _currentSets.length,
              itemBuilder: (context, index) {
                final set = _currentSets[index];
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8.0),
                  child: Row(
                    children: [
                      // 組數標籤
                      SizedBox(width: 40, child: Text('組 ${index + 1}:')),

                      // 重量輸入
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 4.0),
                          child: TextField(
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              labelText: '重量 (kg)',
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                            ),
                            controller: TextEditingController(
                              text: set.weight > 0 ? set.weight.toString() : '',
                            ),
                            onChanged: (value) {
                              final weight = double.tryParse(value) ?? 0;
                              _updateSet(index, weight, set.reps);
                            },
                          ),
                        ),
                      ),

                      // 次數輸入
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 4.0),
                          child: TextField(
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              labelText: '次數',
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                            ),
                            controller: TextEditingController(
                              text: set.reps > 0 ? set.reps.toString() : '',
                            ),
                            onChanged: (value) {
                              final reps = int.tryParse(value) ?? 0;
                              _updateSet(index, set.weight, reps);
                            },
                          ),
                        ),
                      ),

                      // 刪除按鈕
                      IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () => _deleteSet(index),
                      ),
                    ],
                  ),
                );
              },
            ),

            // 按鈕區域
            Padding(
              padding: const EdgeInsets.only(top: 16.0),
              child: Row(
                children: [
                  // 添加組數按鈕
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _addEmptySet,
                      child: const Text('+ 添加組數'),
                    ),
                  ),
                  const SizedBox(width: 8),
                  // 保存按鈕
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _saveWorkoutSet,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                      ),
                      child: const Text(
                        '保存',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 構建空訓練畫面
  Widget _buildEmptyWorkoutBody(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.fitness_center, size: 64, color: Colors.grey),
          const SizedBox(height: 16),
          const Text(
            '還沒有添加任何運動',
            style: TextStyle(fontSize: 18, color: Colors.grey),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _selectExercise,
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text('添加運動'),
          ),
        ],
      ),
    );
  }

  // 構建運動組數卡片
  Widget _buildWorkoutSetCard(BuildContext context, WorkoutSet workoutSet) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 16.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 運動名稱
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  workoutSet.workoutName,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.more_horiz),
                  onPressed: () {
                    // 顯示更多選項
                  },
                ),
              ],
            ),
            const Divider(),

            // 表頭
            Padding(
              padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
              child: Row(
                children: [
                  Expanded(
                    flex: 1,
                    child: Text(
                      'Set',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 2,
                    child: Text(
                      'Previous',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Text(
                      'lbs',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Text(
                      'Reps',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                  const SizedBox(width: 40),
                ],
              ),
            ),

            // 組數列表
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: workoutSet.sets.length,
              itemBuilder: (context, index) {
                final set = workoutSet.sets[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                  child: Row(
                    children: [
                      // 組數
                      Expanded(
                        flex: 1,
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${index + 1}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),

                      // 之前記錄
                      Expanded(
                        flex: 2,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Text(
                            '${set.weight} × ${set.reps}',
                            style: TextStyle(color: Colors.grey[500]),
                          ),
                        ),
                      ),

                      // 重量輸入
                      Expanded(
                        flex: 1,
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${set.weight}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),

                      // 次數輸入
                      Expanded(
                        flex: 1,
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          margin: const EdgeInsets.symmetric(horizontal: 8.0),
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            '${set.reps}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),

                      // 完成勾選
                      const Icon(Icons.check_circle, color: Colors.green),
                    ],
                  ),
                );
              },
            ),

            // 添加組數按鈕
            Padding(
              padding: const EdgeInsets.only(top: 16.0),
              child: OutlinedButton(
                onPressed: () {
                  // 添加新組數邏輯
                },
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size.fromHeight(40),
                ),
                child: const Text('+ 添加組數'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 顯示取消訓練確認對話框
  void _showCancelConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('取消訓練'),
            content: const Text('確定要取消這次訓練嗎？所有數據將被刪除！'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('返回'),
              ),
              TextButton(
                onPressed: () {
                  // 取消訓練
                  context.read<WorkoutBloc>().add(
                    CancelWorkout(widget.workout.id),
                  );
                  Navigator.pop(context); // 關閉對話框
                  Navigator.pop(context); // 返回主頁
                },
                child: const Text('確定取消', style: TextStyle(color: Colors.red)),
              ),
            ],
          ),
    );
  }
}
